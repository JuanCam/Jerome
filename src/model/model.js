/*
Requeremientos pendientes
- Comunicarse con el servidor
- Emitir eventos (emit)
- Escuchar eventos (on)
- clonar (clone) el modelo
- buscar (fetch) en la base de datos.
- crear (deliver) en la base de datos.
- borrar (delete) en la base de datos.
*/
(function(Jerome) {
    var idGen;
    function Model(props) {
        this.url = props.url;
        this.id = (props.id) ? props.id : idGen.next().id;
        this.props = setProps(props);
        this.emitEvns = {};
    }
    Model.prototype = {
        get: function(prop) {
            return this.props[prop];
        },
        set: function(props, value) {
            if (typeof props == 'string') {
                this.props[props] = value;
            } else {
                updateProps.call(this, props);
            }
        },
        remove: function(prop) {
            this.props[prop] = undefined;
        },
        openEmit:function(event,fn) {
        	/*This method should be called inside a controller when
        	it wants to 'hear' an emition from the model*/
        	this.emitEvns[event] = fn;
        },
        emit:function(event) {
        	var fn;
        	fn = this.emitEvns[event];
        	return fn(this);
        }
    };
    /*Local functions*/
    idGen = (function() {
        var id;
        id = 0;
        return {
            next: function() {
                return { id: ++id };
            }
        }
    })();
    function setProps(attrs) {
        var props;
        props = {};
        runObject(attrs, function(value, key) {
            if (key !== 'id' && key !== 'url') setProp.call(props, key, value);
        });
        return props;
    }
    function setProp(key, value) {
        Object.defineProperty(this, key, { value: value })
    }
    function updateProps(attrs) {
        runObject(attrs, function(value, key) {
            setProp.call(this.props, key, value);
        }, this);
    }
    function runObject(object, callback, context) {
        var p, keys, key, fn;
        keys = Object.getOwnPropertyNames(object);
        p = 0;
        while (p < keys.length) {
            key = keys[p];
            fn = (context) ? callback.bind(context) : callback;
            fn(object[key], key, p);
            p++;
        }
    }
    Jerome.defModel = function(props) {
        return new Model(props);
    }
})(window.Jerome)
