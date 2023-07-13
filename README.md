# 쇼핑몰 페이지

`vue3`, `pinia`, `typescript`를 사용하여 만드는 쇼핑몰 페이지입니다. 제 머릿속에 난잡하게 떠돌고 있는 개발 방법론을 직접 개발하면서 구체화시키기 위함이 주 목적입니다. 여유가 된다면 백엔드까지 작업할 예정입니다.

## Tech Stack

### Frontend

- vue3 Composition API
- vue-router
- pinia (상태관리)
- vee-validate (form 유효성 검증)
- typescript

### Styling

- sass

### Etc.

- eslint
- prettier
- msw

### Backend (Not Yet)

- Nest.js

## 의존성 설치

```shell
npm install
```

### 로컬 실행

```shell
npm run serve
```

### 빌드

```shell
npm run build
```

### Todo

- [x] 결제완료 페이지 개발
- [ ] 장바구니 페이지 개발 - 여러 개의 상품을 한번에 주문하는 경우
- [ ] 하나의 상품 안에서 여러가지 옵션을 주문할 때 처리
- [ ] 백엔드(nest.js) 개발 (option)

### Note

- 하나의 '주문'에는 1개 이상의 '상품'이 포함될 수 있고, 하나의 '상품'에는 1개 이상의 옵션이 포함됩니다.
- 주문페이지에서 상품 수량변경은 불가능합니다.
- 장바구니에 담기 기능을 담당하는 로직을 바로 주문하기 로직과 분리해야 할까? 어차피 백엔드단에서는 상태코드만 빼고 나머지는 다 똑같은 값이라서 고민된다.
