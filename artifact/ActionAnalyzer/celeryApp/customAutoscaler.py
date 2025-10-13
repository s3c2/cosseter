import multiprocessing
import re
from celery import Celery
from celery.worker.autoscale import Autoscaler as CeleryAutoscaler
from celery.utils.log import get_logger
from celeryApp import scalerConfig

logging = get_logger(__name__)

class DAAutoscaler(CeleryAutoscaler):
    # We need this percentage of free memory to scale up.
    MEM_FREE_SCALE_UP = scalerConfig.MEM_FREE_SCALE_UP 
    # Any less than this memory and we scale down.
    MEM_FREE_SCALE_DOWN = scalerConfig.MEM_FREE_SCALE_DOWN
    
    def __init__(self, *args, **kwargs):
        self.num_cpus = multiprocessing.cpu_count()
        super(DAAutoscaler, self).__init__(*args, **kwargs)
        if self.min_concurrency == 0:
            self.min_concurrency = 5
        logging.info("DAAutoscaler: Num CPUs %s" % self.num_cpus)
        logging.info("DAAutoscaler: Max con %d" % self.max_concurrency)
        logging.info("DAAutoscaler: Min con %d" % self.min_concurrency)
        # logging.info("DAAutoscaler: Before Scale Procs: [%s]" % (self.processes()))
        
    def _maybe_scale(self, req = None):
        '''Scale up or down if we too much/little load or memory.'''
        mem_free = self._get_free_mem()
        logging.info(self.processes)
        # logging.info("DAAutoscaler: Before Scale Mem: [.2f%%] Procs: [%s]" % (mem_free, self.processes))
        logging.info("DAAutoscaler: Before Scale Max: [%d] Mix: [%d]" % (self.max_concurrency, self.min_concurrency))
        

        if mem_free > self.MEM_FREE_SCALE_UP and self.processes < self.max_concurrency:
            logging.info("DAAutoscaler: Scale Up 1 Mem: [%.2f]" % mem_free)
            self.scale_up(1)
            return True
        if mem_free < self.MEM_FREE_SCALE_DOWN and self.processes > self.min_concurrency:
            logging.info("DAAutoscaler: Scale Down 1 Mem: [%.2f]" % (mem_free))
            self.scale_down(1)
            return True
        
        logging.info("DAAutoscaler: No Change Mem: [%.2f]" % (mem_free))
    
    def _get_free_mem(self):
        '''Return percentage of free memory 0.0 to 1.0.'''
        return scalerConfig.get_used_mem()
# da = DAAutoscaler(pool="",max_concurrency="")
# print(da._get_free_mem())