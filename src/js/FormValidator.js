export class  FormValidator {
    constructor(form, config){
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorInputClass = config.errorInputClass;
        this._activeInputClass = config.activeInputClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._submitButtonClass = config.submitButtonClass;
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this.inputList = Array.from(this._form.querySelectorAll(this._inputSelector)) /*нашел все input в form*/
    };

    _setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input",() => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState();
            })
        });
    };

    _checkInputValidity(inputElement){/*функция проверки формы*/
        if (!inputElement.validity.valid) {/*форма не прошла проверку*/
            this._showError(inputElement, inputElement.validationMessage);
        }else{/*форма прошла проверку*/
            this._hideError(inputElement);
        }
    };

    _showError(inputElement, errorMessage) {/*форма не прошла проверку*/
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._errorInputClass);
        errorElement.classList.add(this._activeInputClass);
        errorElement.textContent = errorMessage;
      };

    _hideError(inputElement) {/*форма прошла проверку*/
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._errorInputClass);
        errorElement.classList.remove(this._activeInputClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput() {/*обходит массив полей и возвращает true, если в массиве inputList есть хотя бы один невалидный input или если все поля валидны — false*/
        return this.inputList.some((inputElement) => { /*удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции*/
        return !inputElement.validity.valid;
      }); 
    }

    _toggleButtonState() {/*функция отключения кнопки*/
        if (this._hasInvalidInput()) {/*отключить кнопку*/
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        }else{/*включить кнопку*/
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    };

    clearValidation() {
        this.inputList.forEach((input) => {
            this._hideError (input)
          });
          this._toggleButtonState()
    }
};

