import EndpointStatusCard from '@/components/EndpointStatusCard';

{/* Endpoint Health Section */}
<div className="mb-32">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
      Live Endpoint Status
    </h2>
    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
      Real-time monitoring of ChainInfra’s infrastructure endpoints.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <EndpointStatusCard
      name="Mainnet BP"
      type="Mainnet Block Producer"
      endpoint="https://mainnet-api.chaininfra.net"
      healthPath="/v1/chain/get_info"
    />
    <EndpointStatusCard
      name="Testnet BP"
      type="Testnet Block Producer"
      endpoint="https://testnet-api.chaininfra.net"
      healthPath="/v1/chain/get_info"
    />
    <EndpointStatusCard
      name="Mainnet Atomic API"
      type="Mainnet AtomicAssets API"
      endpoint="https://xpr-atomic.chaininfra.net"
      healthPath="/health"
    />
  </div>
</div>
