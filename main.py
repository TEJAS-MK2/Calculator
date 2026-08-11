from app import app

if __name__ == '__main__':
    # Keep the local entry point safe by default; production deployments
    # should use a proper WSGI server rather than Flask's development server.
    app.run(host='0.0.0.0', port=5000, debug=False)
