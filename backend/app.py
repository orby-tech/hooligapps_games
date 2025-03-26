from fastapi import FastAPI, Response
import time
import random

from validators.submit import validate_submit_form
from models.submit import SubmitFormData, ResponseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/submit", response_model=ResponseModel)
async def submit_form(data: SubmitFormData):
    # Simulate delay
    time.sleep(random.uniform(0, 3))

    errors = validate_submit_form(data)

    if len(errors) > 0:
        return Response(
            status_code=400,
            content=ResponseModel(success=False, error=errors).model_dump_json(),
        )

    response_data = [
        {"date": data.date, "name": f"{data.first_name} {data.last_name}"}
        for _ in range(random.randint(2, 5))
    ]

    return ResponseModel(success=True, data=response_data, error={}).model_dump()
