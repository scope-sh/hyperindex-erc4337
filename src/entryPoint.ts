import {
  EntryPointV0_6_0_UserOperationEvent_eventArgs,
  EntryPointV0_6_0,
  EntryPointV0_7_0_UserOperationEvent_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

EntryPointV0_6_0.UserOperationEvent.handler(async ({ event, context }) => {
  handleUserOperationEvent_06(event, context);
});

async function handleUserOperationEvent_06(
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

EntryPointV0_7_0.UserOperationEvent.handler(async ({ event, context }) => {
  handleUserOperationEvent_0_7(event, context);
});

async function handleUserOperationEvent_0_7(
  event: eventLog<EntryPointV0_7_0_UserOperationEvent_eventArgs>,
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
