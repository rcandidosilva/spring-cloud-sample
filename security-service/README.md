# security-service

Sample of the oauth token returned from this service.

`{"access_token":
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0Nzg3OTMyMzIsInVzZXJfbmFtZSI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJVU0VSIiwiTUFOQUdFUiJdLCJqdGkiOiJiNGY5M2JiOC05YzY3LTRjY2ItYmRiYS0zMDBkMjBmMjQ0NmUiLCJjbGllbnRfaWQiOiJhY21lIiwic2NvcGUiOlsib3BlbmlkIl19.HVZQfSuXS6vKh3iYbfW-CX1-uw75up9SPNSjDUwdvrubV8icXTjs16idc1Agtva8S9VTP05vfqMMUpwjy3ePRVc3skkR0-LC05EsJFZyRoqG8b0SHGgnLFZqEHvzirHsxT3nUxRa_d-CpjfCJ7iG0s7VPfqC1691ilH9IYDTuUIVIQeGNjBS1HcLzfFeIdCekuaGWMQPn9nlM7oaoDJ-h6YEWyB1wX5KyG81TyFEidbLEqFfCBgQtSYnFi6pcyDCR_QTTF5ti_7osrNt4k5nn6mOgiZG666IfEzN627EUTHwg9TKVJ0GfRNBuB5BxBxdbZ3os_JbUTcSK9DFeKuqFQ",
  "token_type":"bearer",
  "refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsib3BlbmlkIl0sImF0aSI6ImI0ZjkzYmI4LTljNjctNGNjYi1iZGJhLTMwMGQyMGYyNDQ2ZSIsImV4cCI6MTQ4MTM0MjAzMiwiYXV0aG9yaXRpZXMiOlsiVVNFUiIsIk1BTkFHRVIiXSwianRpIjoiODRkNmFjM2UtYjk1Mi00N2M0LWEzM2EtYjY2ZjJlYmI3ZDFiIiwiY2xpZW50X2lkIjoiYWNtZSJ9.KHMJ00nbo0tuPOVi7N3MBYW3gDNx-xX24c19V9rFOGvXnJjP8w4yAZS7EE1HDgrseex3OZgPkDeqS-DAFjRGUv24QhA-C6nnPV5tRffTQlZCaPxnbIqL3rG2gVqZ8WSLx1yjo94v_1lAnV32Ox9cBwZCvDO0EEqO6zEZQ7jRyUI0HxkqglwFkSR38uXY_rLrAzAg1hjM850DwDihwA6tO-1B86w_OcZAe34boEI8_yi3CFGLxiAU4hyE80UXXjxTN-7-HDbtcm4gn8rYWrORJjpRne0cfR4eP0XH8VPp9zDpCAmGckA7dYg5httuDfshLlgeD9Q4ziHFE_QqvdgWmg",
  "expires_in":43199,
  "scope":"openid",
  "jti":"b4f93bb8-9c67-4ccb-bdba-300d20f2446e"}`

## Authorization Grant
- Authorize the request to get the _authorization code_
`http://localhost:9999/uaa/oauth/authorize?response_type=code&client_id=acme&scope=openid&redirect_uri=http://callback`

- Use the returned _code_ to get the oauth _access token_
`curl -X POST "http://acme:acmesecret@localhost:9999/uaa/oauth/token?grant_type=authorization_code&code=7v92iF&redirect_uri=http://callback"`

- Use the _access token_ to call protected endpoints
`http://localhost:9999/uaa/user?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0Nzg3OTI0ODAsInVzZXJfbmFtZSI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJVU0VSIiwiTUFOQUdFUiJdLCJqdGkiOiIzMDc0NjU4MC00YWVkLTRmMzUtYTEzOC0wYjM4YTM2NmNlZTIiLCJjbGllbnRfaWQiOiJhY21lIiwic2NvcGUiOlsib3BlbmlkIl19.BbHJIshmKzJ4PqlEy9bgesQ0NgL8V4LGfxoZOwYZk3RY_joOD1Gb-zwEy4BzKHiXHJIkVOvMneXTfaj-TPFY9TztUF81d1wPaUNV_9wiujAN9ADamHNQEUCxzM2tjKZbcPCdkaw7UHtBi3matI1QrNOEBADb7FKAs9yYJx8La8hY3VC-tgaKfk5DuJ3MuT3bsGOKBDVjaqTbT9Tup1LK-birC5BnEKU2YrMCEomCoG2NHGx_O8l1JmhCxa09g0OS_TRakFGP5ljUhErLs0Ylu2TyiqlMJkFCZXVaO93ma7iZjiv1HA0FNRfpLk1lNUk5RrCRF6XFl-wLENy1rnmCwQ`


## Implicit
- Authorize the request to get the oauth _access token_ via callback URL 
`http://localhost:9999/uaa/oauth/authorize?response_type=token&client_id=acme&redirect_uri=http://callback`

- This is the callback URL returned (with the access token)
`http://callback/#access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0Nzg3OTQxNjMsInVzZXJfbmFtZSI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJVU0VSIiwiTUFOQUdFUiJdLCJqdGkiOiIwMzI5NjEzYy1iYzQyLTQ2NzctYjA3Yi1mZmRlNTRiNmJiMGUiLCJjbGllbnRfaWQiOiJhY21lIiwic2NvcGUiOlsib3BlbmlkIl19.YHUcUCZcJ_1AU0VtC8FH-DE0YRIy3BLU6_wDwfrzEczQy1W4k0WByk2ovS2Ha5NR-zBKfVFfkWygxvcPBfB2Xpa7hufMnzEZ-57ZtAO41KwYzr_ygeLpoO8olIxdTi1ol2AHFU7tzwFGmugm5IoCKlXSR6yyER3gYN6o-otxpPmwl6XzsljAki4A_CXw-b0Kv_DqRE7Xhewep3VcJj7Y5xEFfAkJMiN3H7y24Le__SoWURfWtnB8NPl2VFrnOpFpOfckRDPct5SMUtYIXWhFAFCCb59xnJMBWabdwOjCmFOuktaGdD3aIAFi07mOTsCrt5z-lO1kUuo3l2mw4sVFsQ&token_type=bearer&expires_in=43199&scope=openid&jti=0329613c-bc42-4677-b07b-ffde54b6bb0e`

## Client Credentials

- Request the oauth _access token_ via client credentials grant type 
`curl -X POST "http://acme:acmesecret@localhost:9999/uaa/oauth/token?grant_type=client_credentials&client_id=acme&client_secret=acmesecret"`


## Password
 
- Request the oauth _access token_ informe the username and password at the request 
`http://acme:acmesecret@localhost:9999/uaa/oauth/token?grant_type=password&username=user&password=secret&client_id=acme`

## References
https://projects.spring.io/spring-security-oauth/docs/oauth2.html
https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
https://tools.ietf.org/html/rfc6749
https://spring.io/blog/2015/01/12/spring-and-angular-js-a-secure-single-page-application
https://spring.io/blog/2015/01/12/the-login-page-angular-js-and-spring-security-part-ii
https://spring.io/blog/2015/01/20/the-resource-server-angular-js-and-spring-security-part-iii
https://spring.io/blog/2015/01/28/the-api-gateway-pattern-angular-js-and-spring-security-part-iv
https://spring.io/blog/2015/02/03/sso-with-oauth2-angular-js-and-spring-security-part-v
https://spring.io/blog/2015/03/23/multiple-ui-applications-and-a-gateway-single-page-application-with-spring-and-angular-js-part-vi
https://spring.io/blog/2015/05/13/modularizing-the-client-angular-js-and-spring-security-part-vii
