import{r as c}from"./index-B-yxVHM3.js";console.log("[forms-page] registrado");c("forms-page",(d,{html:m,state:a,scope:e})=>{const[l,o]=a("",{reRender:!1}),[t,s]=a("",{reRender:!1}),[n,i]=a(!1);return e.getSent=n,e.name=l,e.updateName=r=>o(r),e.updateEmail=r=>s(r),e.send=()=>{if(!l()||!t()){alert("Por favor completa todos los campos.");return}i(!0),console.log("📨 Enviado:",{nombre:l(),email:t()})},m`
    <div class="card p-4">
      <h1 class="h4 mb-3">Formulario de contacto</h1>
      <form ng-submit="send()">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            name="fullNameField"
            ng-model="fullName"
            ng-change="updateName(fullName)"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="emailField"
                 ng-model="email" ng-change="updateEmail(email)" placeholder="tucorreo@ejemplo.com" required />
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>

      <div class="alert alert-success mt-4" ng-if="getSent()">
        <strong>¡Gracias, {{ name() | uppercase }}!</strong> Hemos recibido tus datos correctamente.
      </div>
    </div>
  `});
