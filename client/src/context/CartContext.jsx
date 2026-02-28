import {createContext, useContext} from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import toast from "react-hot-toast"; 

// Création du context global pour la gestion de commande d'albums 
export const CartContext = createContext(); 


export const CartContextProvider = ({children } ) => {
  const navigate = useNavigate(); 
  const [cartItems, setCartItems ] = useState({}); 



  // Fonction qui va permettre d'ajouter un album au panier // 
  const addToCart = (itemId) => {
    
  }
}