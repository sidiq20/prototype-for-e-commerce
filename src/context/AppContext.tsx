import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User, CartItem, WishlistItem, Order } from '../types/User';
import type { Product } from '../types/Product';
import { products } from '../data/products';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  orders: Order[];
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_TO_CART'; payload: { productId: number; quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: number }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  cartItems: [],
  wishlistItems: [],
  orders: [],
};

// Load state from localStorage
const loadFromStorage = (): AppState => {
  try {
    const saved = localStorage.getItem('appState');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return initialState;
};

// Save state to localStorage
const saveToStorage = (state: AppState) => {
  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  let newState: AppState;

  switch (action.type) {
    case 'LOGIN':
      newState = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      break;

    case 'LOGOUT':
      newState = {
        ...initialState,
      };
      break;

    case 'UPDATE_USER':
      newState = {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
      break;

    case 'ADD_TO_CART':
      const existingCartItem = state.cartItems.find(
        item => item.productId === action.payload.productId
      );
      
      if (existingCartItem) {
        newState = {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              productId: action.payload.productId,
              quantity: action.payload.quantity || 1,
              addedAt: new Date().toISOString(),
            },
          ],
        };
      }
      break;

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        cartItems: state.cartItems.filter(item => item.productId !== action.payload),
      };
      break;

    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        newState = {
          ...state,
          cartItems: state.cartItems.filter(item => item.productId !== action.payload.productId),
        };
      } else {
        newState = {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      }
      break;

    case 'CLEAR_CART':
      newState = {
        ...state,
        cartItems: [],
      };
      break;

    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlistItems.find(
        item => item.productId === action.payload
      );
      
      if (!existingWishlistItem) {
        newState = {
          ...state,
          wishlistItems: [
            ...state.wishlistItems,
            {
              productId: action.payload,
              addedAt: new Date().toISOString(),
            },
          ],
        };
      } else {
        newState = state;
      }
      break;

    case 'REMOVE_FROM_WISHLIST':
      newState = {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.productId !== action.payload),
      };
      break;

    case 'ADD_ORDER':
      newState = {
        ...state,
        orders: [action.payload, ...state.orders],
      };
      break;

    default:
      newState = state;
  }

  // Save to localStorage whenever state changes
  saveToStorage(newState);
  return newState;
};

interface AppContextType {
  state: AppState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getCartTotal: () => number;
  getCartItemsWithProducts: () => (CartItem & { product: Product })[];
  getWishlistItemsWithProducts: () => (WishlistItem & { product: Product })[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, loadFromStorage);

  // Mock authentication functions (in real app, these would call APIs)
  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data (in real app, this would come from API)
    const mockUser: User = {
      id: '1',
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'LOGIN', payload: mockUser });
    return true;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone,
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'LOGIN', payload: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (productId: number) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const isInWishlist = (productId: number) => {
    return state.wishlistItems.some(item => item.productId === productId);
  };

  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemsWithProducts = () => {
    return state.cartItems.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)!,
    })).filter(item => item.product);
  };

  const getWishlistItemsWithProducts = () => {
    return state.wishlistItems.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)!,
    })).filter(item => item.product);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    return order;
  };

  const value: AppContextType = {
    state,
    login,
    register,
    logout,
    updateUser,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    getCartItemsWithProducts,
    getWishlistItemsWithProducts,
    createOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};