import {
  EntryPointV0_6_0Contract,
  EntryPointV0_7_0Contract,
} from "../generated/src/Handlers.gen";
import {
  EntryPointV0_6_0Contract_AccountDeployedEvent_eventArgs,
  EntryPointV0_6_0Contract_AccountDeployedEvent_handlerContext,
  EntryPointV0_6_0Contract_AccountDeployedEvent_loaderContext,
  EntryPointV0_6_0Contract_UserOperationEventEvent_eventArgs,
  EntryPointV0_6_0Contract_UserOperationEventEvent_handlerContext,
  EntryPointV0_6_0Contract_UserOperationEventEvent_handlerContextAsync,
  EntryPointV0_6_0Contract_UserOperationEventEvent_loaderContext,
  eventLog,
} from "../generated/src/Types.gen";

const KERNEL_V3_FACTORY_ADDRESS = "0xd703aae79538628d27099b8c4f621be4ccd142d5";

EntryPointV0_6_0Contract.AccountDeployed.loader(({ event, context }) => {
  loadAccountDeployed(event, context);
});

EntryPointV0_7_0Contract.AccountDeployed.loader(({ event, context }) => {
  loadAccountDeployed(event, context);
});

function loadAccountDeployed(
  event: eventLog<EntryPointV0_6_0Contract_AccountDeployedEvent_eventArgs>,
  context: EntryPointV0_6_0Contract_AccountDeployedEvent_loaderContext
) {
  const address = event.params.sender.toLowerCase();
  const factory = event.params.factory.toLowerCase();
  if (factory === KERNEL_V3_FACTORY_ADDRESS) {
    context.KernelV3Account.load(`${event.chainId}-${address}`);
    context.contractRegistration.addKernelV3Account(address);
  }
}

EntryPointV0_6_0Contract.AccountDeployed.handler(({ event, context }) => {
  handleAccountDeployed(event, context);
});

EntryPointV0_7_0Contract.AccountDeployed.handler(({ event, context }) => {
  handleAccountDeployed(event, context);
});

function handleAccountDeployed(
  event: eventLog<EntryPointV0_6_0Contract_AccountDeployedEvent_eventArgs>,
  context: EntryPointV0_6_0Contract_AccountDeployedEvent_handlerContext
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

EntryPointV0_6_0Contract.UserOperationEvent.loader(({ event, context }) => {
  loadUserOperationEvent(event, context);
});

EntryPointV0_7_0Contract.UserOperationEvent.loader(({ event, context }) => {
  loadUserOperationEvent(event, context);
});

function loadUserOperationEvent(
  event: eventLog<EntryPointV0_6_0Contract_UserOperationEventEvent_eventArgs>,
  context: EntryPointV0_6_0Contract_UserOperationEventEvent_loaderContext
) {
  const hash = event.params.userOpHash;
  context.UserOp.load(`${event.chainId}-${hash}`);
}

EntryPointV0_6_0Contract.UserOperationEvent.handlerAsync(
  async ({ event, context }) => {
    handleUserOperationEvent(event, context);
  }
);

EntryPointV0_7_0Contract.UserOperationEvent.handlerAsync(
  async ({ event, context }) => {
    handleUserOperationEvent(event, context);
  }
);

async function handleUserOperationEvent(
  event: eventLog<EntryPointV0_6_0Contract_UserOperationEventEvent_eventArgs>,
  context: EntryPointV0_6_0Contract_UserOperationEventEvent_handlerContextAsync
) {
  const hash = event.params.userOpHash;
  const bundler = event.txOrigin;
  context.UserOp.set({
    id: `${event.chainId}-${hash}`,
    chainId: event.chainId,
    blockNumber: event.blockNumber,
    transactionIndex: event.transactionIndex,
    transactionHash: event.transactionHash,
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
