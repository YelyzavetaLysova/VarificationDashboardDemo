# backend/app/services/auth.py

import csv
import os
from pathlib import Path
from typing import Dict, Optional

class UserService:
    def __init__(self):
        # Compute path relative to this file:
        # <project-root>/backend/app/services/auth.py → …/data/users.csv
        base_dir = Path(__file__).parent.parent        # …/backend/app
        data_dir = base_dir / "data"                   # …/backend/app/data
        data_dir.mkdir(parents=True, exist_ok=True)

        self.db_file = data_dir / "users.csv"

        # Write header if brand-new
        if not self.db_file.exists():
            with self.db_file.open("w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["name", "email", "password"])

    def register(self, name: str, email: str, password: str) -> Dict[str, str]:
        """Append a new user to the CSV and return their info."""
        with self.db_file.open("a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([name, email, password])
        return {"name": name, "email": email}

    def authenticate(self, email: str, password: str) -> Optional[Dict[str, str]]:
        """
        Look up email+password in the CSV.
        If they match a row, return {"name":..., "email":...}, else None.
        """
        if not self.db_file.exists():
            return None

        with self.db_file.open(newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["email"] == email and row["password"] == password:
                    return {"name": row["name"], "email": row["email"]}
        return None
