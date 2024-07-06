import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export const Filtro = () => {
  const [images, setImages] = useState([])

  const formSchema = Yup.object().shape({
    Lectura: Yup.string()
      .min(5, 'Mínimo 5 caracteres')
      .max(244, 'Máximo 244 caracteres')
      .required('Campo requerido')
  })

  const handleSubmit = async (values) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: values.Lectura,
          client_id: 'qWU3fYrz1FkfOqJ5mRKeFldRZsQzq-SKrm14cieP568', // Reemplaza con tu Access Key de Unsplash
          per_page: 10
        }
      })
      setImages(response.data.results)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="Filtro">
      <header>
      <Formik
        initialValues={{
          Lectura: ''
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
        >
        {() => (
          <Form>
            <h4>Mi Filtro</h4>
            <br />
            <Field name="Lectura" />
            <ErrorMessage name="Lectura" component="div" className="error" />
            <br /><br />
            <Button type="submit" variant="primary">Enviar</Button>{' '}
          </Form>
        )}
      </Formik>
      </header>

      <div className="image-results">
        {images.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filtro
