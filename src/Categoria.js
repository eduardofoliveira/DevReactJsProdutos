import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categoria extends Component {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)

    this.state = {
      produtos: [],
      categorias: {},
      id: null
    }

    this.renderProduto = this.renderProduto.bind(this)

  }
  loadData(id){
    this.setState({ id })
    this.props.loadProdutos(id)
    this.props.loadCategoria(id)
  }
  componentDidMount() {
    let id = this.props.match.params.catId
    this.loadData(id)
  }
  componentWillReceiveProps(newProps){
    if(newProps.match.params.catId !== this.state.id){
      this.loadData(newProps.match.params.catId)
    }
  }
  renderProduto(produto){
    return (
      <div className="well flex-container-produto" key={produto.id}>
        <p>{produto.produto}</p>
        <div>
        <Link to={'/produtos/editar/'+produto.id} className="btn btn-warning">
          <span className="glyphicon glyphicon-pencil"></span> Editar
        </Link>
        <button className="btn btn-danger btn-excluir-produto"
          onClick={() => {
            this.props.removeProduto(produto)
              .then(res => this.loadData(this.props.match.params.catId))
          }
        }>
          <span className="glyphicon glyphicon-remove"></span> Excluir
        </button>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2>{this.props.categoria.categoria}</h2>
        <p>{/*JSON.stringify(this.props.categoria)*/}</p>
        {this.props.produtos.length === 0 && 
          <div className="alert alert-danger">
            <p>Nenhum produto.</p>
          </div>
        }
        {this.props.produtos.map(this.renderProduto)}
      </div>
    )
  }
}

export default Categoria