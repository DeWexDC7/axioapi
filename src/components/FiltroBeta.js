import React, { useState } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

export const FiltroBeta = () => {
  const [images, setImages] = useState([])

  const formSchema = Yup.object().shape({
    Browser: Yup.string()
      .required('Campo requerido')
      .min(3, 'Mínimo 3 caracteres')
      .max(20, 'Máximo 20 caracteres')
  })

  const handleSubmit = async (values) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: values.Browser,
          client_id: 'qWU3fYrz1FkfOqJ5mRKeFldRZsQzq-SKrm14cieP568', // Reemplaza con tu Access Key de Unsplash
          per_page: 10
        }
      })
      setImages(response.data.results)
    } catch (error) {
      console.error('Error:', error)
    }
    console.log(values)
  }

  return (
    <div>
      <header>
        <Formik
          initialValues={{
            Browser: ''
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <label>Ingrese lo que desea buscar:</label>
              <Field className='form-control' type='text' name='Browser' />
              <ErrorMessage
                name='Browser'
                component='div'
                className='text-danger'
              />

              <button type='submit' className='btn btn-primary'>
                Buscar
              </button>
            </Form>
          )}
        </Formik>
      </header>
      <div className="image-results">
        {images.length > 0 && images.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.urls.small} alt={image.alt_description} className='img-thumbnail'/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FiltroBeta
