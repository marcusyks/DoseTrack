import environ
env = environ.Env()
environ.Env.read_env()

bot_token = env('BOT_TOKEN')
app_name = env('APP_NAME')
