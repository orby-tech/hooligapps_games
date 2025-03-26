install:
	cd backend && poetry install --no-root
	cd frontend && npm install

test:
	cd backend && poetry run pytest

run-frontend:
	cd frontend && npm run dev

run-backend:
	cd backend && poetry run uvicorn app:app --reload --port 7070