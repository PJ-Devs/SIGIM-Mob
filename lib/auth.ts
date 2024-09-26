
export const registerEnterprise = async (body:any) => {
  console.log('empece')
    try {
      const response = await fetch('http://192.168.1.7:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const updatedEnterprise = await response.json();
      console.log('Empresa registrada:', updatedEnterprise);
      return updatedEnterprise;
    } catch (error) {
      console.error('Error registrando la empresa:', error);
    }
  };
