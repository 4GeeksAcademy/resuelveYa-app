from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"


def process_payment(provider_id, service_post_id, amount, payment_method):
    # 1. Crear entrada en ServiceHistory
    service_history = ServiceHistory(
        provider_id=provider_id,
        service_post_id=service_post_id,
        payment_method=payment_method,
        amount_paid=amount
    )
    db.session.add(service_history)
    db.session.flush()  # Para obtener el ID del nuevo registro sin hacer commit

    # 2. Procesar el pago con Stripe
    payment_intent = stripe.PaymentIntent.create(
        amount=amount * 100,  # Monto en centavos
        currency="pen",
        payment_method="pm_card_visa"  # Asegúrate de usar el método de pago correcto
    )

    # 3. Actualizar ServiceHistory con el payment_id
    service_history.payment_id = payment_intent.id

    # 4. Crear entrada en Payment
    payment = Payment(
        service_history_id=service_history.id,
        payment_method=payment_method,
        payment_id=payment_intent.id,
        amount_paid=amount
    )
    db.session.add(payment)

    # Hacer commit para guardar todos los cambios
    db.session.commit()

    return {
        "service_history_id": service_history.id,
        "payment_id": payment.id,
        "message": "Pago procesado con éxito"
    }