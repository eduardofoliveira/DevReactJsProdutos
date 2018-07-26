import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosNovo extends Component {
  constructor(props){
    super(props)

    this.handleNewProduto = this.handleNewProduto.bind(this)

    this.state = {
      redirect: false
    }
  }

  handleNewProduto(){
    let produto = {
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.createProduto(produto)
      .then((res) => this.setState({ redirect: '/produtos/categorias/'+produto.categoria }))
  }
  render(){
    let { categorias } = this.props
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    return (
    <div>
      <h2>Novo produto</h2>

      <div className="form-group">
        <label>Categoria:</label>
        <select className="form-control" ref="categoria">
          {categorias
            .map(c => <option key={c.id} value={c.id}>{c.categoria}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Nome:</label>
        <input
          placeholder="Nome do novo produto"
          className="form-control"
          ref="produto">
        </input>
      </div>
      
      <button onClick={this.handleNewProduto} className="btn btn-primary">Salvar</button>
      
    </div>)
  }
}

export default ProdutosNovo