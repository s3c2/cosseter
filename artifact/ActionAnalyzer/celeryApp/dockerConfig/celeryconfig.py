result_backend = "mongodb://mongo-server:27017"
mongodb_backend_settings = {
    'database': 'CeleryBackend',
    'taskmeta_collection': 'TaskResults'
}
broker_url="redis://redis:6379/0"