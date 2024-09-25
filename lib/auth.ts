import { DTOEnterprise, DTOEnterpriseColaborator } from "../../types/products";

export const registerEnterprise = async (enterprise:DTOEnterprise) => {
    try {
      const response = await fetch('https://localhost/api/enterprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enterprise),
      });
      const updatedEnterprise = await response.json();
      console.log('Empresa registrada:', updatedEnterprise);
    } catch (error) {
      console.error('Error registrando la empresa:', error);
    }
  };

 export const registerColaborators = async (colaborators: DTOEnterpriseColaborator[]) => {
    try {
      const response = await fetch('https://localhost/api/colaboradores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colaboradores: colaborators }),
      });
      const updatedColaborators = await response.json();
      console.log('Colaboradores registrados:', updatedColaborators);
    } catch (error) {
      console.error('Error registrando colaboradores:', error);
    }
  };

 export const registerAdmin = async (adminData: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch('https://localhost/api/administrador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      const updatedAdmin = await response.json();
      console.log('Administrador creado:', updatedAdmin);
    } catch (error) {
      console.error('Error creando administrador:', error);
    }
  };