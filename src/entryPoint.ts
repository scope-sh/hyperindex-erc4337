import {
  contractRegistrations,
  EntryPointV0_6_0,
  EntryPointV0_6_0_AccountDeployed_eventArgs,
  EntryPointV0_6_0_UserOperationEvent_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

const KERNEL_V3_FACTORY_ADDRESS = "0xd703aae79538628d27099b8c4f621be4ccd142d5";

EntryPointV0_6_0.AccountDeployed.contractRegister(({ event, context }) => {
  handleAccountDeployedContractRegister(event, context);
});
EntryPointV0_7_0.AccountDeployed.contractRegister(({ event, context }) => {
  handleAccountDeployedContractRegister(event, context);
});

function handleAccountDeployedContractRegister(
  event: eventLog<EntryPointV0_6_0_AccountDeployed_eventArgs>,
  context: contractRegistrations
) {
  const address = event.params.sender.toLowerCase();
  const factory = event.params.factory.toLowerCase();
  if (factory === KERNEL_V3_FACTORY_ADDRESS) {
    context.addKernelV3Account(address);
  }
}

EntryPointV0_6_0.AccountDeployed.handler(async ({ event, context }) => {
  handleAccountDeployedEvent(event, context);
});
EntryPointV0_7_0.AccountDeployed.handler(async ({ event, context }) => {
  handleAccountDeployedEvent(event, context);
});

async function handleAccountDeployedEvent(
  event: eventLog<EntryPointV0_6_0_AccountDeployed_eventArgs>,
  context: handlerContext
) {
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
}

EntryPointV0_6_0.UserOperationEvent.handler(async ({ event, context }) => {
  handleUserOperationEvent(event, context);
});

EntryPointV0_7_0.UserOperationEvent.handler(async ({ event, context }) => {
  handleUserOperationEvent(event, context);
});

async function handleUserOperationEvent(
  event: eventLog<EntryPointV0_6_0_UserOperationEvent_eventArgs>,
  context: handlerContext
) {
  const hash = event.params.userOpHash;
  const bundler = event.transaction.from
    ? event.transaction.from.toLowerCase()
    : undefined;

  context.UserOp.set({
    id: `${event.chainId}-${hash}`,
    chainId: event.chainId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionIndex: event.transaction.transactionIndex,
    transactionHash: event.transaction.hash,
    hash,
    actualGasCost: event.params.actualGasCost,
    actualGasUsed: event.params.actualGasUsed,
    nonce: event.params.nonce,
    bundler,
    paymaster: event.params.paymaster.toLowerCase(),
    sender: event.params.sender.toLowerCase(),
    success: event.params.success,
    entryPoint: event.srcAddress.toLowerCase(),
  });
}
