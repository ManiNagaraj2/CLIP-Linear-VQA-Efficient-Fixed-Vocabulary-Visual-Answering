# Use an official Python runtime as the base image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app

# Create and set the working directory
WORKDIR $APP_HOME

# Copy the application's requirements file
COPY requirements.txt .

# Install the required Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Create the necessary directories
RUN mkdir -p $APP_HOME/static/uploads

# Define the command to run the application
CMD ["python", "app.py"]
