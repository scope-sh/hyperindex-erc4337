import { KernelV3AccountContract } from "../generated/src/Handlers.gen";

const TYPE_VALIDATOR = "0x01";
const TYPE_PERMISSION = "0x02";

KernelV3AccountContract.RootValidatorUpdated.loader(({ event, context }) => {
  const account = event.srcAddress.toLowerCase();
  context.KernelV3Account.load(`${event.chainId}-${account}`);
});

KernelV3AccountContract.RootValidatorUpdated.handler(({ event, context }) => {
  const accountAddress = event.srcAddress.toLowerCase();
  const account = context.KernelV3Account.get(
    `${event.chainId}-${accountAddress}`
  );
  if (!account) {
    return;
  }
  const rootValidator = event.params.rootValidator.toLowerCase();
  const validatorType = rootValidator.slice(0, 4);
  if (validatorType === TYPE_VALIDATOR) {
    const validatorAddress = `0x${rootValidator.slice(4, 44)}`;
    context.KernelV3Account.set({
      id: `${event.chainId}-${accountAddress}`,
      modules: account.modules,
      chainId: account.chainId,
      rootValidator: validatorAddress,
      address: account.address,
    });
  } else if (validatorType === TYPE_PERMISSION) {
    return;
  }
});

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
    rootValidator: account.rootValidator,
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
    rootValidator: account.rootValidator,
    address: account.address,
  });
});
