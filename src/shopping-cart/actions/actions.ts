// 'use client'
/*
  {
    'uuid-123-1': 1,
    'uuid-123-2': 2
  }
*/

import { getCookie, hasCookie, setCookie } from 'cookies-next';

const CART = 'cart'

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie(CART)) {
    const cookieCart = JSON.parse(getCookie(CART) as string ?? '{}')
    return cookieCart
  }
  return {};
}

export const addProductToCart = (id: string): void => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }
  setCookie(CART, JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart()
  delete cookieCart[id]
  setCookie(CART, JSON.stringify(cookieCart))
}