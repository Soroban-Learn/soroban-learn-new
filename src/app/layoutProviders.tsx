"use client";
import { queryClient } from "@/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const LayoutProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>{children}</RecoilRoot>
  </QueryClientProvider>
);

export default LayoutProviders;
