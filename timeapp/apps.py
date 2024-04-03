from django.apps import AppConfig


class TimeappConfig(AppConfig):
    name = "timeapp"

    def ready(self):
        import timeapp.signals
