import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let rtnRequest = req.clone()
  
  if(req.withCredentials){
      console.log(req.withCredentials)
      let token = JSON.parse(localStorage.getItem('user') as string).token
      console.log(token)
      rtnRequest = req.clone({
        headers : req.headers.set('x-token',token),
      })
      return next(rtnRequest) ;
  } else {
    console.log('pasa sin token')
    return next(req);
  }
};
