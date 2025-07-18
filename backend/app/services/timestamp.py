import random
import pendulum


# timestamp service stub
class TimestampService:
    def normalize(self, input_str: str):
        raise NotImplementedError

class PendulumTimestampService(TimestampService):
    def normalize(self, input_str: str):
        import pendulum
        return pendulum.parse(input_str)


class RandomTimestampService(TimestampService):
    def normalize(self, input_str: str) -> pendulum.DateTime:
        """
        Ignores input and returns a timestamp randomly offset within the past year.
        """
        now = pendulum.now()
        return now.subtract(
            days=random.randint(0, 365),
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59)
        )