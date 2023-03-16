const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {
         contato: {} })
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }

        console.log(contato);
        req.flash('sucess', 'Contato registrado com sucesso.')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)) //substituí _id por ._id
        return
    } catch (e) {
        console.log(e);
        res.render('erro.ejs')
    }
}

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('error')

    const contato = await Contato.buscaPorId(req.params.id);

    if (!contato) return res.render('error')
    res.render('contato', { contato });
}

exports.edit = async function(req, res) {
    try{
    if(!req.params.id) return res.render('error')

    const contato = await new Contato(req.body)
    await contato.edit(req.params.id)

    if (contato.errors.length > 0) {
        req.flash('errors', contato.errors)
        req.session.save(() => res.redirect('/contato/index'))
        return
    }

    console.log(contato);
    req.flash('sucess', 'Contato editado com sucesso.')
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)) 
    return
    } catch(e) {
        console.log(e);
        console.log('edit');
        res.render('error')
    }

}
