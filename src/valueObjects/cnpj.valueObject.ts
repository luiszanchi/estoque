import { CnpjInvalidException } from "src/exceptions/cnpj.exception";

export class Cnpj {
    public readonly value: string;

    constructor(
        value: string
    ) {
        const cnpj: string = value.replace(/[^\d]+/g,'');
        
        if (! this.validate(cnpj)) {
            throw new CnpjInvalidException(cnpj);
        }

        this.value = cnpj;
    }

    private validate(value: string): boolean {
        let cnpj = value.replace(/[^\d]+/g,'');
 
        if(cnpj == '') return false;
        
        if (cnpj.length != 14) return false;
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
            
        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros: string = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        
        if (resultado.toString() != digitos.charAt(0)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2){
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        
        if (resultado.toString() != digitos.charAt(1)) {
            return false;
        }
            
        return true;
    }
}