import yaml

config_file = 'application_properties-prod.yml'

def load_config(file_path):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

config = load_config(config_file)

log_format = '%(levelname)s: %(asctime)s - %(name)s - %(message)s'