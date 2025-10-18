import{r as l}from"./index-BLQl9IX_.js";console.log("[react-page] registrado");l("react-page",(d,{html:s,state:a,scope:e,effect:r})=>{const[n,c]=a(0,{reRender:!1});return e.getClicks=n,e.increment=()=>c(t=>t+1),e.reset=()=>c(0),r(()=>{const t=e.$watch(n,(i,o)=>{i!==o&&console.log("[react-page] clicks changed →",i)});return()=>{t()}},[]),s`
    <div class="py-4">
      <h2 class="h4 mb-3">Demo React-like ⚛️</h2>
      <p class="text-muted">
        Esta página está renderizada mediante una función JS que devuelve HTML, 
        similar a un componente React.
      </p>

      <div class="mb-4">
        <ui-card 
          title="Componente funcional" 
          body="Los componentes ui-card y ui-counter están definidos con defineComponent().">
        </ui-card>
      </div>

      <ui-counter></ui-counter>

      <div class="card p-3 mt-4">
        <p class="mb-2">Clicks: <strong>{{ getClicks() }}</strong></p>
        <button class="btn btn-primary me-2" ng-click="increment()">+1</button>
        <button class="btn btn-outline-secondary" ng-click="reset()">Reiniciar</button>
      </div>
    </div>
  `});
