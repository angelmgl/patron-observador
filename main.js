//esta clase contiene todos los métodos del patrón observador
class Subject {
    constructor() {
        this.observers = []
    }

    subscribe(o) {
        this.observers.push(o)
    }

    unsubscribe(o) {
        this.observers = this.observers.filter(e => e != o);
    }

    notify(model) {
        this.observers.forEach(observer => {
            observer.notify(model);
        })
    }
}
//esta clase hereda de la principal y añade sus características, corresponde
//al campo de la moneda guaranies
class TextSubject extends Subject {
    constructor() {
        super();
        this.valor = 0;
    }

    notify(valor) {
        this.valor = valor;

        super.notify(this);
    }
}
//ahora creamos las clases para las monedas que se actualizarán
//de acuerdo al valor de los guaraníes
class dolarObserver {
    notify(subject) {
        let cambio = subject.valor / 6750;
        document.getElementById("dolar").innerHTML = cambio.toFixed(2);
    }
}
class euroObserver {
    notify(subject) {
        let cambio = subject.valor / 8250;
        document.getElementById("euro").innerHTML = cambio.toFixed(2);
    }
}
class pesoObserver {
    notify(subject) {
        let cambio = subject.valor / 80;
        document.getElementById("peso").innerHTML = cambio.toFixed(2);
    }
}
//ahora instanciamos las clases y creadas y las suscribimos al campo de guaraníes
const textSubject = new TextSubject();
const dolar = new dolarObserver();
const euro = new euroObserver();
const peso = new pesoObserver();
textSubject.subscribe(dolar);
textSubject.subscribe(euro);
textSubject.subscribe(peso);
//aquí hacemos que se notifique cada cambio en el campo guaraníes
document.getElementById("guaranies")
.addEventListener("input", () => {
    textSubject.notify(event.target.value);
});