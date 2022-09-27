//Redondeando el precio a mostrar a dos cifras decimales
function formatDecimal(val, n) {
    n = n || 2;
    var str = "" + Math.round(parseFloat(val) * Math.pow(10, n));
    while (str.length <= n) {
        str = "0" + str;
    }
    var pt = str.length - n;
    return str.slice(0, pt) + "." + str.slice(pt);
}

function getRadioVal(form, name) {
    var radios = form.elements[name];
    var val;
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked == true) {
            val = radios[i].value;
            break;
        }
    }
    return val;
}

//Calcula el subtotal de extras seleccionados
function getToppingsTotal(e) {
    var form = this.form;
    var val = parseFloat(form.elements['total_extra'].value);
    if (this.checked == true) {
        val += parseFloat(this.value);
    } else {
        val -= parseFloat(this.value);
    }
    form.elements['total_extra'].value = formatDecimal(val);
    updatePizzaTotal(form);
}

//Obtiene el subtotal 
function getSizePrice(e) {
    this.form.elements['total_combo'].value = parseFloat(this.value);
    updatePizzaTotal(this.form);
}

//Calcula el precio total a cancelar por el combo tomando en cuenta
//los subtotales de acuerdo al tamaño y a los ingredientes seleccionados
function updatePizzaTotal(form) {
    var total_combo = parseFloat(form.elements['total_combo'].value);
    var total_extra = parseFloat(form.elements['total_extra'].value);
    var iva = parseFloat((total_combo + total_extra) * 0.13);
    var final = parseFloat(total_combo + total_extra + iva);
    //var mas = parseFloat(form.elements['mas'].value);
    form.elements['total'].value = formatDecimal(total_combo + total_extra);//total 

    form.elements['total3'].value = formatDecimal(final);//total final

}


(function () {
    var form = document.getElementById('orden');
    var el = document.getElementById('extras_orden');
    // Determinar los extras seleccionados en las casillas de verificación
    var tops = el.getElementsByTagName('input');
    for (var i = 0, len = tops.length; i < len; i++) {
        if (tops[i].type === 'checkbox') {
            tops[i].onclick = getToppingsTotal;
        }
    }
    var sz = form.elements['size'];
    for (var i = 0, len = sz.length; i < len; i++) {
        sz[i].onclick = getSizePrice;
    }

    // set sz_tot to value of selected
    form.elements['total_combo'].value = formatDecimal(parseFloat(getRadioVal(form, 'size')));
    updatePizzaTotal(form);
})();

/*********************/
/*Par el comentario */
var i = 0;

/*function increment() {
    i += 1;
}*/

/********************************************************************
* Función que permite eliminar dinámicamente campos de formulario *
********************************************************************/
function removeElement(parentDiv, childDiv) {
    if (childDiv == parentDiv) {
        alert("Contenedor padre no puede ser removido.");
    }
    else if (document.getElementById(childDiv)) {
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
        parent.removeChild(child);
    }
    else {
        alert("Contenedor hijo ha sido removido o no existe.");
        return false;
    }
}


/*para cuando el usuario haga click en añadir comentario */
function nameFunction() {
    var r = document.createElement("span");
    var y = document.createElement("input");
    y.setAttribute("type", "text");
    y.setAttribute("placeholder", "Comentario");

    var g = document.createElement("p");

    //increment();

    y.setAttribute("name", "textelement_" + i);

    r.appendChild(y);
    g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
    r.appendChild(g);
    r.setAttribute("id", "id_" + i);
    document.getElementById("myForm").appendChild(r);
}