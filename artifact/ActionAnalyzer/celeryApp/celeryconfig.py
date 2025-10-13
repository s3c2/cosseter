result_backend = "mongodb://localhost:27017"
mongodb_backend_settings = {
    'database': 'CeleryBackend',
    'taskmeta_collection': 'TaskResults'
}
broker_url="redis://localhost:6379/0"