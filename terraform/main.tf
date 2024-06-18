provider "azurerm" {
  features {}
}

# Crea un grupo de recursos
resource "azurerm_resource_group" "rg" {
  name     = "mi-cluster-rg"
  location = "West Europe"
}

# Crea un clúster de Kubernetes
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "mi-cluster-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "micluster"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Production"
  }
}

# Obtiene las credenciales de acceso al clúster
resource "azurerm_kubernetes_cluster_node_pool" "pool" {
  name                  = "internal"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.aks.id
  vm_size               = "Standard_D2_v2"
  node_count            = 2
  vnet_subnet_id        = azurerm_subnet.subnet.id
}

# Configura un grupo de seguridad de red
resource "azurerm_network_security_group" "nsg" {
  name                = "mi-nsg"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

# Configura una red virtual
resource "azurerm_virtual_network" "vnet" {
  name                = "mi-vnet"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = ["10.0.0.0/8"]
}

# Configura una subred dentro de la red virtual
resource "azurerm_subnet" "subnet" {
  name                 = "mi-subnet"
  virtual_network_name = azurerm_virtual_network.vnet.name
  resource_group_name  = azurerm_resource_group.rg.name
  address_prefixes     = ["10.0.1.0/24"]
}