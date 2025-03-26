import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_submit_success():
    response = client.post("/submit", json={"date": "2023-10-10", "first_name": "John", "last_name": "Doe"})
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert len(response.json()["data"]) > 0

def test_submit_whitespace_error():
    response = client.post("/submit", json={"date": "2023-10-10", "first_name": "John Doe", "last_name": "Doe"})
    assert response.status_code == 400
    print(response.json())
    assert response.json()["success"] is False
    assert "first_name" in response.json()["error"]
    assert "last_name" not in response.json()["error"]

    assert response.json()["error"]["first_name"] == ["No whitespace in first name is allowed"]

def test_submit_whitespace_error_lastname():
    response = client.post("/submit", json={"date": "2023-10-10", "first_name": "John", "last_name": "Doe Smith"})
    assert response.status_code == 400
    assert response.json()["success"] is False
    assert "last_name" in response.json()["error"]
    assert "first_name" not in response.json()["error"]

    assert response.json()["error"]["last_name"] == ["No whitespace in last name is allowed"]

def test_submit_empty_error():
    response = client.post("/submit", json={"date": "2023-10-10", "first_name": "", "last_name": ""})
    assert response.status_code == 400
    assert response.json()["success"] is False
    assert "first_name" in response.json()["error"]
    assert "last_name" in response.json()["error"]