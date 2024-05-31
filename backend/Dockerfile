FROM python:3.9-alpine

# Instala curl
RUN apk update && apk add --no-cache curl

WORKDIR /backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Configurar el PYTHONPATH para incluir /backend
ENV PYTHONPATH=/backend

# Ejecutar el script main.py como módulo
CMD ["python", "-m", "app.main"]