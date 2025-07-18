import random
from typing import List, Dict
# You may need to install `lorem-text` via pip: `pip install lorem-text`
from lorem_text import lorem

# research service stub
class ResearchService:
    async def find_contacts(self, identity: str):
        raise NotImplementedError

class OpenAIResearchService(ResearchService):
    def __init__(self, api_key: str):
        self.api_key = api_key
    async def find_contacts(self, identity: str):
        # placeholder for OpenAI-based research
        return []


class RandomResearchService(ResearchService):
    async def find_contacts(self, identity: str) -> List[Dict]:
        """
        Returns a list with a single Lorem Ipsum snippet as mock contact info.
        """
        snippet = lorem.words(random.randint(5, 15))
        return [{
            "type": "lorem",
            "value": snippet,
            "source_url": None
        }]