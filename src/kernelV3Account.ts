import { KernelV3AccountContract } from "../generated/src/Handlers.gen";

KernelV3AccountContract.ModuleInstalled.loader(({ event, context }) => {
  const account = event.srcAddress.toLowerCase();
  context.KernelV3Account.load(`${event.chainId}-${account}`);
});

KernelV3AccountContract.ModuleInstalled.handler(({ event, context }) => {
  const accountAddress = event.srcAddress.toLowerCase();
  const account = context.KernelV3Account.get(
    `${event.chainId}-${accountAddress}`
  );
  if (!account) {
    return;
  }
  const module = event.params.mod.toLowerCase();
  const modules = account.modules;
  modules.push(module);
  context.KernelV3Account.set({
    id: `${event.chainId}-${accountAddress}`,
    modules,
    chainId: account.chainId,
    address: account.address,
  });
});

KernelV3AccountContract.ModuleUninstalled.loader(({ event, context }) => {
  const account = event.srcAddress.toLowerCase();
  context.KernelV3Account.load(`${event.chainId}-${account}`);
});

KernelV3AccountContract.ModuleUninstalled.handler(({ event, context }) => {
  const accountAddress = event.srcAddress.toLowerCase();
  const account = context.KernelV3Account.get(
    `${event.chainId}-${accountAddress}`
  );
  if (!account) {
    return;
  }
  const module = event.params.mod.toLowerCase();
  const modules = account.modules;
  modules.splice(modules.indexOf(module), 1);
  context.KernelV3Account.set({
    id: `${event.chainId}-${accountAddress}`,
    modules,
    chainId: account.chainId,
    address: account.address,
  });
});
