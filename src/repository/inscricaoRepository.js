import conexao from './connections.js';

export async function inserir(inscricao) {
    let comando = 'insert into tb_inscricao(nm_nome, ds_email, nr_telefone, nm_bairro, ds_sabendo, ds_foialuno, bt_verificacao) values(?,?,?,?,?,?,FALSE)';

    let [resposta] = await conexao.query(comando, [
         inscricao.nome,
         inscricao.email,
         inscricao.telefone,
         inscricao.bairro,
         inscricao.sabendo,
         inscricao.foialuno
    ])

    inscricao.id = resposta.insertId

    return resposta
}

export async function consultarClientes() {
    let comando = 'select * from tb_inscricao'

    let [resposta] = await conexao.query(comando)

    return resposta
}

export async function verificarDuplicado(telefone) {
    try {
        const comando = 'SELECT * FROM tb_inscricao WHERE nr_telefone = ?';
        
        
        const [resposta] = await conexao.query(comando, [telefone]);
        
        
        if (resposta.length != [0]) {
            return true; //Se retorna true tem registros duplicados 
        } else {
            return false;
        }
    } catch (error) {
        throw error;
}

}

export async function verificarDuplicadoEmail(email) {
    try {
        const comando = 'SELECT * FROM tb_inscricao WHERE ds_email = ?';
        
        
        const [resposta] = await conexao.query(comando, [email]);
        
        
        if (resposta.length != [0]) {
            return true; //Se retorna true tem registros duplicados 
        } else {
            return false;
        }
    } catch (error) {
        throw error;
}
}

