import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valided: true,
            error: false,
            success: false,
            form: {
                firstName: {
                    value: '',
                    valid: '',
                    required: true
                },
                lastName: {
                    value: '',
                    valid: '',
                    required: true
                },
                email: {
                    value: '',
                    valid: '',
                    required: true
                },
                phone: {
                    value: '',
                    valid: '',
                    required: false
                },
                celular: {
                    value: '',
                    valid: '',
                    required: false
                },
                type: {
                    value: '',
                    valid: '',
                    required: true
                },
                description: {
                    value: '',
                    valid: '',
                    required: true
                }
            }
        };

    }

    validate() {
        let stateChange = this.state.form;

        Object.keys(stateChange)
            .forEach(key => {
                if(stateChange[key].value.trim() == '' && stateChange[key].required)
                    stateChange[key].valid = 'error';
                else
                    stateChange[key].valid = 'valid';
            });

        this.setState({ form: stateChange });

        let valided = Object.keys(stateChange)
            .filter(item => stateChange[item].valid == 'error');

        this.setState({
            valided: valided.length ? false : true
        });

        return valided.length ? false : true;

    }

    sendEmail() {
        let form = this.state.form;
        axios.post('//api.vtex.com/keratinex/dataentities/CT/documents', {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            phone: form.phone.value,
            celular: form.celular.value,
            type: form.type.value,
            description: form.description.value
        }, {
            headers: {
                'accept': 'application/vnd.vtex.ds.v10+json',
                'content-type': 'application/json'
            }
        })
            .then(request => this.setState({success: true}))
            .catch(error => this.setState({error: true}));
    }
    
    handleSubmit() {
        if(this.validate()) {
            this.sendEmail();
        }
    }

    handleChange(event) {
        let name = event.target.getAttribute('name');
        let stateChange = this.state.form;

        stateChange[name] = {
            value: event.target.value,
            valid: ''
        };

        this.setState({ form: stateChange });
    }

    componentWillMount() {

    }

    render() {
        let form = this.state.form;

        return <section className="contact">
            <div className="input--text">
                <label htmlFor="firstName">Nome: </label>
                <input name="firstName" id="firstName" type="text"
                       className    = {form.firstName.valid}
                       value        = {form.firstName.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="input--text">
                <label htmlFor="lastName">Sobrenome</label>
                <input name="lastName" id="lastName" type="text"
                       className    = {form.lastName.valid}
                       value        = {form.lastName.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="input--text">
                <label htmlFor="email">E-Mail</label>
                <input name="email" id="email" type="text"
                       className    = {form.email.valid}
                       value        = {form.email.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="input--text">
                <label htmlFor="phone">Telefone</label>
                <input name="phone" id="phone" type="text"
                       className    = {form.phone.valid}
                       value        = {form.phone.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="input--text">
                <label htmlFor="celular">Celular</label>
                <input name="celular" id="celular" type="text"
                       className    = {form.celular.valid}
                       value        = {form.celular.value}
                       onChange     = {this.handleChange.bind(this)} />
            </div>
            <div className="select">
                <label htmlFor="type">Tipo</label>
                <select name="type" id="type"
                        className   = {form.type.valid}
                        value       = {form.type.value}
                        onChange    = {this.handleChange.bind(this)} >
                    <option value="">Selecionar motivo</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Dúvida">Dúvida</option>
                    <option value="Reclamação">Reclamação</option>
                </select>
            </div>
            <div className="textarea">
                <label htmlFor="description">Mensagem</label>
                <textarea name="description" id="description" cols="30" rows="10"
                          className = {form.description.valid}
                          value     = {form.description.value}
                          onChange  = {this.handleChange.bind(this)}></textarea>
            </div>
            <div className="contact__actions">
                <button type="button"
                    onClick     = {(e)=>this.handleSubmit(e)} >Enviar
                </button>
            </div>

            <div className="contact__error">
                {!this.state.valided && <span className="warning">Verifique os campos selecionados são obrigatórios.</span>}
                {this.state.error && <span className="error">Erro de envio, tente novamente</span>}
                {this.state.success && <span className="sucess">Sua mensagem foi enviada com sucesso!</span>}
            </div>

        </section>
    }

}

Contact.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
