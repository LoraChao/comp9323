# start run the flask server
try:
    from flask_app import app
    import apis.auth
    import apis.content
    import apis.homepage
    import apis.mood
    import apis.offer
    import apis.article

    app.run(debug=True)
except ImportError as e:
    print(e)
