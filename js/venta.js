async function comprar() {
    const { value: email } = await Swal.fire({
      title: 'Para completar su compra ingrese su correo electronico para recibir el detalle',
      html:
        '<input id="mailInput" class="swal2-input" placeholder="Ingrese su correo electrónico" type="email">' +
        '<input id="mailCheck" class="swal2-input" placeholder="Confirme su correo electrónico" type="email">',
      focusConfirm: false,
      preConfirm: () => {
        const email1 = Swal.getPopup().querySelector("#mailInput").value;
        const email2 = Swal.getPopup().querySelector("#mailCheck").value;

        if (email1 !== email2) {
          Swal.showValidationMessage('Los correos no coinciden');
        }
        return { email: email1 };
      },
    });
  
    if (email) {
      Swal.fire(`Entered email: ${email.email}`);
    }
  }