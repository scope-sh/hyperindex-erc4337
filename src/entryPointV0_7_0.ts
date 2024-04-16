import { EntryPointV0_7_0Contract } from "../generated/src/Handlers.gen";

const KERNEL_V3_FACTORY_ADDRESS = "0xd703aae79538628d27099b8c4f621be4ccd142d5";

EntryPointV0_7_0Contract.AccountDeployed.loader(({ event, context }) => {
  const address = event.params.sender.toLowerCase();
  const factory = event.params.factory.toLowerCase();
  if (factory === KERNEL_V3_FACTORY_ADDRESS) {
    context.KernelV3Account.load(`${event.chainId}-${address}`);
    context.contractRegistration.addKernelV3Account(address);
  }
});

EntryPointV0_7_0Contract.AccountDeployed.handler(({ event, context }) => {
  const address = event.params.sender.toLowerCase();
  const factory = event.params.factory.toLowerCase();
  if (factory === KERNEL_V3_FACTORY_ADDRESS) {
    context.KernelV3Account.set({
      id: `${event.chainId}-${address}`,
      chainId: event.chainId,
      address,
      rootValidator: undefined,
      modules: [],
    });
  }
});
