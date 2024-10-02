const API = {
  URL: "http://192.168.0.18:8000/api"
}

export const registerEnterprise = async (body: any) => {
  console.log("empece");
  console.log(body);
  try {
    const response = await fetch("http://192.168.1.7:8000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const updatedEnterprise = await response.json();
    console.log("Empresa registrada:", updatedEnterprise);
    return updatedEnterprise;
  } catch (error) {}
};

export const login = async (body: any) => {

  try {
    const response = await fetch("http://192.168.1.7:8000/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const updatedEnterprise = await response.json();
    console.log("Empresa registrada:", updatedEnterprise);
    return updatedEnterprise;
  } catch (error) {
    console.log("Error al iniciar sesión");
    console.log(error);
  }
};

export const getProfile = async () => {

  try {
    const response = await fetch("http://192.168.1.7:8000/api/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${"1|gcaxDUJCEbv0xr7LOznsyJEQISOzQgqmhooKCFEm3780d08b"}`,
      },
    });
    console.log('sjlkafjlakjs')
    const user = await response.json();
    console.log("user:", user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const logout = async (body: any) => {
  console.log(body);
  try {
    const response = await fetch(`${API.URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("Sesión cerrada");
  } catch (error) {
    console.log("Error al cerrar sesión");
  }
};
