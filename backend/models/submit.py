from dataclasses import field
from pydantic import BaseModel, Field
from typing import List, Dict


class SubmitFormData(BaseModel):
    date: str = Field(..., title="Date of birth")
    first_name: str = Field(..., title="First name")
    last_name: str = Field(..., title="Last name")


class ResponseModel(BaseModel):
    success: bool
    data: List[Dict[str, str]] = field(default_factory=list)
    error: Dict[str, List[str]] = field(default_factory=dict)
