import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {
  constructor(props){
    super(props)

    this.state = {
      produto: {},
      redirect: ''
    }

    this.handleEditProduto = this.handleEditProduto.bind(this)
  }

  componentDidMount(){
    this.props.readProduto(this.props.match.params.id)
      .then(res => {
        this.setState({
          produto: res.data
        })
        this.refs.categoria.value = res.data.categoria
      })
  }
  handleEditProduto(){
    let produto = {
      id: this.props.match.params.id,
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.editProduto(produto)
      .then((res) => this.setState({ redirect: '/produtos/categorias/'+produto.categoria }))
  }
  render(){
    let { categorias } = this.props
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    return (<div>
    <h2>Editar produto</h2>

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
        placeholder="Nome do produto"
        className="form-control"
        ref="produto"
        defaultValue={this.state.produto.produto}>
      </input>
    </div>
    
    <button onClick={this.handleEditProduto} className="btn btn-primary">Salvar</button>
    
  </div>)
  }
}

export default ProdutosEditar