import axios from 'axios';

async function submitForm(formData) {
  try {
    const response = await axios.post('http://localhost:5000/api/user/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data || error.message);
    throw new Error(error.response.data.error || 'Error en la solicitud');
  }
}

export default submitForm;
