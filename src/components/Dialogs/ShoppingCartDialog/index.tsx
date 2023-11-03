'use client';

import { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { CartItemProps } from '@/components/FoodCardDialog';

import { getCartItens, setCartItens } from '@/redux/features/cartItem-slice';
import { useAppSelector } from '@/redux/store';
import { Root, Trigger } from '@radix-ui/react-dialog';

import ShoppingCartPortal from './ShoppingCartPortal';
import styles from './styles.module.css';

interface ShoppingCardDialogProps {
  companyData: {
    deliveryPhoneNumber: string;
    name: string;
    deliveryTax: string;
    deliveryTime: string;
    address: string;
  };
}

export default function ShoppingCartDialog({
  companyData,
}: ShoppingCardDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const cartItens = useAppSelector((state) => getCartItens(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const cartData =
      (JSON.parse(
        `${localStorage.getItem(`md-food-cart-items`)}`
      ) as CartItemProps[]) || [];

    dispatch(setCartItens([...cartData]));
  }, [dispatch]);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.shoppingCartDialogTrigger}>
        <FaShoppingBag size={24} fill="#fff" />
        {cartItens.length > 0 ? (
          <div className={styles.shoppingCartDialogContainerQuantityOfProducts}>
            {cartItens.length}
          </div>
        ) : null}
      </Trigger>
      <ShoppingCartPortal
        cartItens={cartItens}
        setShowDialog={setShowDialog}
        companyData={companyData}
      />
    </Root>
  );
}
