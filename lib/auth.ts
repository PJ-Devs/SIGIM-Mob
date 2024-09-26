
export const registerEnterprise = async (body:any) => {
  console.log('empece')
  console.log(body)
    try {
      const response = await fetch('http://192.168.105.9:8000/api/auth/signup', {
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
   
    }
  };

  export const login = async (body:any) => {
    console.log('empece')
    console.log(body)
      try {
        const response = await fetch('http://192.168.105.9:8000/api/auth/token', {
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
      
      }
    };
  